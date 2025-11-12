import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import type { TaskFormData } from '@/types/index';
import { useForm } from 'react-hook-form';
import TaskForm from '@/components/tasks/TaskForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTask } from '@/api/TaskAPI';
import { toast } from 'react-toastify';

export default function AddTaskModal() {
    const navigate = useNavigate() // para cerrar el modal

    /** Leer si el modal existe */
    const location = useLocation() // usamos useLocation para acceder a la ubicación actual de la URL
    const queryParams = new URLSearchParams(location.search) // esto permite acceder a los parámetros de la URL
    const modalTask = queryParams.get('newTask') // para saber si el parámetro 'newTask' existe
    const show = modalTask ? true : false // si el parámetro 'newTask' está presente, mostramos el modal

    /** Obtener el projectId */
    const params = useParams()
    const projectId = params.projectId!

    const initialValues : TaskFormData = {
        name: '',
        description: ''
    }
    const {register, handleSubmit, reset, formState: {errors}} = useForm({defaultValues: initialValues})

    const queryClient = useQueryClient()

    const {mutate} = useMutation({
        mutationFn: createTask,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['project', projectId]})
            toast.success(data)
            navigate(location.pathname, {replace: true}) // ocultar el modal
            reset()
        }
    })

    const handleCreateTask = (formData: TaskFormData) => {
        const data = {
            formData,
            projectId
        }
        mutate(data)
    }

    return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, {replace: true})}> 
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                    <Dialog.Title
                                        as="h3"
                                        className="font-black text-4xl  my-5"
                                    >
                                        Nueva Tarea
                                    </Dialog.Title>

                                    <p className="text-xl font-bold">Llena el formulario y crea  {''}
                                        <span className="text-fuchsia-600">una tarea</span>
                                    </p>

                                    <form className='mt-10 space-y-3'
                                    onSubmit={handleSubmit(handleCreateTask)}
                                    noValidate // para evitar las validaciones de html5 y poder hacerla yo
                                    >
                                        <TaskForm
                                        register={register}
                                        errors={errors}
                                        />
                                        <input
                                        type="submit"
                                        value='Guardar Tarea'
                                        className="bg-fuchsia-600 hover:bg-fuchsia-700 p-3 w-full text-white
                                        uppercase font-bold cursor-pointer transition-colors" 
                                        />
                                    </form>


                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}