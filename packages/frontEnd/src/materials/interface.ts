import { CSSProperties, PropsWithChildren } from "react";

export interface CommonComponentProps extends PropsWithChildren{
    id: string;
    name: string;
    styles?: CSSProperties;
    [key: string]: any
}

type IType = 'select' | 'input' | 'inputNumber'
export interface ComponentSetter {
    name: string; // 字段名
    label: string; // 前面的文案
    type: IType; // 表单类型，比如 select
    [key: string]: any;
}

export interface ComponentEvent {
    name: string;
    label: string;
    action?: any[]
}
export interface ComponentConfig {
    name: string;
    defaultProps: Record<string, any>,
    desc: string;
    headTitle: string;
    smallTitle: string;
    setter?: {// 属性
        title: string,
        propsList: ComponentSetter[]
    }[];
    stylesSetter?: { // 样式
        title: string,
        styleList: ComponentSetter[]
    }[]
    component: {
        dev: any,
        prod: any
    }, // 渲染哪个组件
    events?: ComponentEvent[] // 事件
}


