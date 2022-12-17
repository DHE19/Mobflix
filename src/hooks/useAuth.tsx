
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User
} from 'firebase/auth'
import {useRouter} from 'next/router'
import { createContext, useContext, useEffect, useMemo, useState} from 'react'
import { auth } from '../../firebase';

interface IAuth{
    user: User | null;
    signUp:(email:string, password:string) => Promise<void>;
    signIn:(email:string, password:string) => Promise<void>;
    logOut: () => Promise<void>;
    error:string | null;
    loading:boolean;

}
const AuthContext = createContext<IAuth>({
    user:null,
    signUp: async () => {},
    signIn: async () =>{},
    logOut: async () =>{},
    error:null,
    loading:false
});

interface IProps{
    children: React.ReactNode;
}



export const AuthProvider:React.FC<IProps> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [initialLoading, setInitialLoading] = useState(true);
    const router = useRouter();

    // Persisting the user
    useEffect(() => onAuthStateChanged(auth,(user) =>
    {   
        if(user){
            setUser(user);
            setLoading(false);
        }else{
            setUser(null)
            setLoading(true);
            //redirije automaticamente a login si no se tiene valor en
            router.push('/login');
        }

        setInitialLoading(false)
    }),[auth])

    const signUp = async (email:string, password:string) =>{
        setLoading(true);
        await createUserWithEmailAndPassword(auth,email,password).then(userCredential =>{
            setUser(userCredential.user);
            router.push('/');
        }).catch(err => alert(err.message)).finally(() => setLoading(false));
    }
    const signIn = async (email:string, password:string) =>{
        setLoading(true);
        await signInWithEmailAndPassword(auth,email,password).then(userCredential =>{
            setUser(userCredential.user);
            router.push('/');
        }).catch(err => alert(err.message)).finally(() => setLoading(false));
    }


    const logOut = async () =>{
        setLoading(true);
        signOut(auth).then(() => setUser(null)).
        catch(err => alert(err.message)).
        finally(() => setLoading(false));
    }


    const memoValue = useMemo<IAuth>(() => ({
        user,
        signUp,
        signIn,
        loading,
        logOut,
        error
    }),[user,loading]);
    return (<AuthContext.Provider value={memoValue}>
             {
                !initialLoading && children
             }
            </AuthContext.Provider>)
}

export default function useAuth() {
    return useContext(AuthContext)
}
