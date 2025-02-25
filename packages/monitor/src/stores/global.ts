import { create } from "zustand";

type IMode = 'login' | 'forget' | 'account'

interface ISate{
    message: IState
    width: number
    mode: IMode
}

interface IAction{
    setMessage: (message: IState) => void
    setWidth: (width: number) => void
    setMode: (mode: IMode) => void
}


interface IState{
    type: 'success' | 'error' | 'warning' | 'info' | null
    text: string
}

export const useGlobal = create<ISate & IAction>((set) => ({
    message:{
        type: null,
        text: ''
    },
    width:0,
    mode:'login',
    setMode: (mode: IMode) => set(() => ({
        mode: mode
    })),
    setWidth: (width: number) => set(() => ({
        width
    })),
    setMessage: (message: IState) => set(() => ({
        message: {
            type: message.type,
            text: message.text
        }
    }))
}));