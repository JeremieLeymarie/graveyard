import dayjs, { QUnitType, OpUnitType } from "dayjs";

export const getElapsedTime = (
  dateA: string | Date,
  dateB: string | Date,
  unit: QUnitType | OpUnitType = "day"
) => Math.abs(dayjs(dateA).diff(dayjs(dateB), unit));
