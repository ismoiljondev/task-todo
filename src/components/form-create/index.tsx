import { useForm } from 'react-hook-form'
import useTodoStore from '../../store/todoStore';
import { data } from 'react-router-dom';
import { ListCard } from '../list-card';

interface TodoForm {
    text: string;
    desc: string
}

const FormCreate = () => {
    const { register, handleSubmit, reset } = useForm<TodoForm>();

    const { addTodo, removeTodo, todos, toggleStatus } = useTodoStore();

    const onSubmit = (data: TodoForm) => {
        addTodo({
            id: Date.now(),
            title: data.text,
            desc: data.desc,
            status: 'notcompleted'
        });
        reset()
    }
    return (
        <div className='flex flex-col gap-5 items-center'>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2 min-w-[350px]'>
                <input placeholder="enter your title " className="border rounded-md p-2" {...register("text", { required: true })} />
                <input placeholder="enter your title " className="border rounded-md p-2" {...register("desc", { required: true })} />
                <button type='submit' className="bg-black text-white p-2 rounded-md border-none">add task</button>
            </form>
            {todos?.map((todo) => (
                <ListCard id={todo?.id} title={todo?.title} desc={todo?.desc} status={todo?.status} />
            ))}
        </div>
    )
}

export { FormCreate }