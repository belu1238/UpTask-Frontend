import { getUser } from "@/api/AuthAPI"
import { useQuery } from "@tanstack/react-query"


export const useAuth = () => {
    const { data, isError, isLoading } = useQuery({
        queryKey: ['user'], // identificador unico
        queryFn: getUser,
        retry: 1, // reintentar 1 vez en caso de error
        refetchOnWindowFocus: false // no volver a llamar a la api cuando la ventana recupere el foco
    })

    return { data, isError, isLoading }
}