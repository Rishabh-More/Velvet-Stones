import { useEffect, useState } from "react";
import { useStore } from "../config/Store";

export function useDataFilter() {
  const { state, dispatch } = useStore();
  // const [query, updateQuery] = useState({
  //   range: {
  //     grossWt: { start: 0, end: 100 },
  //     netWt: { start: 0, end: 100 },
  //   },
  //   itemStatus: [],
  //   itemCategory: [],
  //   itemType: [],
  // });
  console.log("[HOOK] query from state", state.filters);
  const [query, updateQuery] = useState(state.filters);

  async function ApplyFilter() {
    let data = state.data.catalogue;

    //Step 1: Sort the array with subset range
    const subset = await data.filter((item) => {
      var itemGrossWt = parseFloat(item.netWeight);
      var itemNetWt = parseFloat(item.grossWeight);
      if (
        itemGrossWt >= query.range.grossWt.start &&
        itemGrossWt <= query.range.grossWt.end &&
        itemNetWt >= query.range.netWt.start &&
        itemNetWt <= query.range.netWt.end
      ) {
        return true;
      } else {
        return false;
      }
    });
    //console.log("[HOOK] filter subset is", subset);

    //Step 2: Remove the range object from query and
    //clean the object from any empty arrays i.e. No Selection.
    const cleaned_query = {};
    await Object.keys(query).forEach((key) => {
      const value = query[key];
      if (value.length) cleaned_query[key] = value;
    });
    //console.log("[HOOK] cleaned query is", cleaned_query);

    //Step 3: Filter the subset data and update filter
    if (Object.keys(cleaned_query).length !== 0) {
      //console.log("[HOOK] positive filter logic");
      //return filtered data from subset
      const filtered = await subset.filter(function (item) {
        return Object.entries(cleaned_query).every(
          ([key, value]) => value.includes(item[key]) && value.length
        );
      });
      //console.log("[HOOK] filtered data dispatched", filtered);
      //Dispatch to filter[]
      await dispatch({ type: "UPDATE_FILTER", payload: filtered });
    } else {
      //console.log("[HOOK] negative filter logic");
      //return subset. Dispatch to filter[]
      await dispatch({ type: "UPDATE_FILTER", payload: subset });
    }
  }

  async function ClearFilter() {
    await dispatch({ type: "CLEAR_FILTER" });
  }
  //Return whichever items you want to return from the hook.
  //These can be values, arrays and even functions as well
  return { query, updateQuery, ApplyFilter, ClearFilter };
}
