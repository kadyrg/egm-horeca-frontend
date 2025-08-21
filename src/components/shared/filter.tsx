"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { FilterDialog } from "./filter-dialog";
import { FilterDrawer } from "./filter-drawer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setFilterWindowState } from "@/store/filter-window-slice";

function Filter() {
  const filterWindowState = useSelector(
    (state: RootState) => state.filterWindowSlice.state,
  );
  const dispatch = useDispatch();
  const isMobile = useIsMobile();

  if (isMobile)
    return (
      <FilterDrawer
        open={filterWindowState}
        onOpenChange={(e) => {
          dispatch(setFilterWindowState(e));
        }}
      />
    );
  return (
    <FilterDialog
      open={filterWindowState}
      onOpenChange={(e) => {
        dispatch(setFilterWindowState(e));
      }}
    />
  );
}

export { Filter };
