import { Database } from "lucide-react";
import ActionCard from "./UI/ActionCard";
import { Action } from "@/types/category";


type ActionProps = {
  availableActions: Action[];
};

const Actions: React.FC<ActionProps> = ({ availableActions }) => {
  return (
    <div className="flex flex-col p-4 border border-white rounded-lg h-[550px]">
      <div className="space-y-2 flex flex-row">
        <Database /> <h1 className="ml-2 font-bold">Available Actions</h1>
      </div>
      <p className="mb-4">Get all {availableActions.length} actions for this app by following the instruction guide.</p>
      <div className="overflow-y-auto">
        {availableActions.map((action, i) => { return <ActionCard key={i} title={action.name} description={action.description}/>})}
      </div>
    </div>
  );
};

export default Actions;
