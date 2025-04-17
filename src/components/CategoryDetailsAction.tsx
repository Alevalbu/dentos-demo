'use client';
import { Action } from "@/types/category";
import Actions from "./Actions";
import InstallationNav from "./InstalationNav";


type itemDetailsActionsProps = {
    actions?: Action[]
}
const CategoryDetailsAction: React.FC<itemDetailsActionsProps> = ({actions}) => {
    return (
        <div className="flex flex-row justify-between p-6">
            <InstallationNav />
            {actions && actions.length > 0 && (
                <Actions availableActions={actions}/>
            )}
        </div>
    )
}

export default CategoryDetailsAction;