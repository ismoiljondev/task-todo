import useTodoStore from "../../store/todoStore";

interface props {
    id: number,
    title: string,
    desc: string,
    status: "completed" | "notcompleted";
}

const ListCard = ({ title, desc, status, id }: props) => {
    const { removeTodo, toggleStatus } = useTodoStore();
    return (
        <div key={id} className="rounded-md border px-6 py-4 flex flex-col gap-3 min-w-[300px]">
            <div className="flex justify-between gap-4"><p className="text-2xl font-medium">{title}</p>
                <div className={`border rounded-full text-sm p-1 ${status === "completed" ? "border-green-500 text-green-500" : "border-red-500 text-red-500"}`}>{status}</div>
            </div>
            <p className="truncate">{desc}</p>
            <div className="flex gap-2 self-end">
                <button className="border py-1 px-2 rounded-md" onClick={() => toggleStatus(id)}>edit</button>
                <button className="border py-1 px-2 rounded-md bg-red-500 text-white" onClick={() => removeTodo(id)}>delete</button>
            </div>
        </div>
    )
}

export { ListCard }