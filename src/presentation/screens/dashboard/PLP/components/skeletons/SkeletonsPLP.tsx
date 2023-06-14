import React from 'react';
import { SkeletonBigPhoto } from '../../views/option-bigPhoto/SkeletonBigPhoto';
import { SkeletonGrid } from '../../views/option-grid/SkeletonGrid';
import { SkeletonList } from '../../views/option-list/SkeletonList';
import { OPTION_SELECTED } from '../utils/optionsPlp';

export default function SkeletonsPLP({
  loading,
  selectOp
}: {
  loading: boolean;
  selectOp: string;
}) {
  if (!loading) return null;
  return (
    <>
      {selectOp === OPTION_SELECTED.GRID && <SkeletonGrid />}
      {selectOp === OPTION_SELECTED.SQUARE && <SkeletonBigPhoto />}
      {selectOp === OPTION_SELECTED.LIST && <SkeletonList />}
    </>
  );
}
