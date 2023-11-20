import React, { createContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { db, app } from '../../firebaseConnection';
import { query } from 'firebase/database';

// Criação do Contexto de Usuário
export const UserContext = createContext();

// Componente Provider
export const UserProvider = ({ children }) => {
    const auth = getAuth(app);
    const usersRef = ref(db, 'usuarios/');
    const tasksRef = ref(db, 'tasks/');
    const [user, setUser] = useState(null);
    const [tasks, setTasks] = useState(null);
    const [loading, setLoading] = useState(false);
    const [signed, setSigned] = useState(false);
    const [bearerToken, setBearerToken] = useState(null);
    const [task, setTask] = useState(null);

    async function fetchTasks() {
        try {

            query(ref(db, ), orderByValue('dataFinal'), equalTo(), (querySnapShot) => {
                const tasksData = querySnapShot.val() || {};
                setTasks(tasksData);
            }, {
                onlyOnce: true
            });
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    }

    const createTask = async () => {
        try {
            await push(ref(db, '/tasks'), {
                ...task,
                dataFinal: dataFinal,
                usuario_uid: user.id
            });

            alert('Tarefa cadastrada com sucesso!');

            setTask(null);
        } catch (e) {
            alert('erro: ' + e);
        }
    }

    // Funcao para verificar sessão ativa com o firebase
    const fetchSession = async () => {
        setLoading(true);
        await onAuthStateChanged(auth, (user) => {
            setUser(user);
            console.log(user);
            if (user) setSigned(true);
        });
        setLoading(false);
    };

    // Função para fazer login do usuário
    const loginUser = async (userData) => {
        setLoading(true);
        const { email, password } = userData;
        // await signInWithEmailAndPassword(auth, 'nandreyout@gmail.com', 'Teste123')
        await signInWithEmailAndPassword(auth, email, password)
            .then((value) => {
                alert('Bem-vindo: ' + value.user.email);
                // setBearerToken(value.user.stsTokenManager);
                console.log(value.user);
                setSigned(true);
                setUser(value.user.email);
            })
            .catch((error) => {
                if (error.code === 'auth/weak-password') {
                    alert('Sua senha deve ter pelo menos 6 caracteres');
                } else if (error.code === 'auth/invalid-email') {
                    alert('E-mail não cadastrado!');
                } else {
                    alert('Ops, algo deu errado: ' + error.message);
                }
                setSigned(false);
                return;
            });

        setLoading(false);
    };

    // Função para fazer logout do usuário
    const logOut = async () => {
        await signOut(auth);
        setUser(null);
        setBearerToken(null);
    };

    async function createUser(data) {
        try {
            const { email, nome, password } = data;
            setUser({
                nome: nome,
                email: email
            });
            await createUserWithEmailAndPassword(auth, email, password).then(response => {
                const { uid } = response.user;
                set(ref(db, 'usuarios/' + uid), user);
                setUser({ ...user, id: uid });
            });
            setSigned(true);
            alert('Usuario criado: ' + user.nome);
        } catch (error) {
            if (error.code === 'auth/weak-password') {
                alert('Sua senha deve ter pelo menos 6 caracteres');
            } else if (error.code === 'auth/invalid-email') {
                alert('Email inválido');
            } else {
                alert('Ops, algo deu errado: ' + error.message);
            }
        }
    }

    const fetchTasks = async () => {
        if (!user) {
            alert("Usuário não logado")
            return;
        }
        console.log('user: ' + user);
        try {
            onValue(ref(db, 'tasks/'), (querySnapShot) => {
                const tasksData = querySnapShot.val() || {};
                setTasks(tasksData);
            });
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSession();
    }, []);

    useEffect(() => {
        fetchTasks();
    }, [createTask]);

    return (
        <UserContext.Provider value={{ signed, user, loginUser, logOut, createUser, fetchTasks, }}>
            {children}
        </UserContext.Provider>
    );
};