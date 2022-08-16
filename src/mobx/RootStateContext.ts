import React  from "react"
import { UserStore } from "./UserStore"

type RootStateContextValue = {
    user: UserStore
}

const RootStateContext = React.createContext<RootStateContextValue>({} as RootStateContextValue)

const store = new UserStore();
