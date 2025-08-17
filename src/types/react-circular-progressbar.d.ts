declare module "react-circular-progressbar" {
  import * as React from "react";

  export interface CircularProgressbarProps {
    value: number;
    text?: string;
    styles?: any;
    strokeWidth?: number;
    className?: string;
  }

  export const CircularProgressbar: React.FC<CircularProgressbarProps>;

  export function buildStyles(styles: any): any;
}