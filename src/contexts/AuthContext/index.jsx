import React, { createContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { db, app } from '../../firebaseConnection';
import { equalTo, get, onValue, orderByChild, push, query, ref } from 'firebase/database';

// Criação do Contexto de Usuário
export const UserContext = createContext();

// Componente Provider
export const UserProvider = ({ children }) => {
    const auth = getAuth(app);
    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState(null);
    const [tasks, setTasks] = useState({});
    const [loading, setLoading] = useState(false);
    const [signed, setSigned] = useState(false);
    const [bearerToken, setBearerToken] = useState(null);
    const [task, setTask] = useState(null);

    // Função para fazer login do usuário
    const loginUser = async (userData) => {
        setLoading(true);

        const { email, password } = userData;
        // await signInWithEmailAndPassword(auth, email, password)
        await signInWithEmailAndPassword(auth, 'nandreyout@gmail.com', 'Teste123')
            .then((value) => {
                setUserId(value.user.uid);
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

        const response = await get(ref(db, `usuarios/${userId}`));
        setUser(response);
        setSigned(true);
        setLoading(false);
    };

    // Função para fazer logout do usuário
    const logOut = async () => {
        setLoading(true);
        await signOut(auth);
        setUser(null);
        setBearerToken(null);
        setSigned(false);
        setLoading(false);
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
                setUserId(uid);
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
        try {
            setLoading(true);
            await onValue(ref(db, `tasks/`), snapshot => {
                const dataTasks = snapshot.val() ? Object.entries(snapshot.val()) : null;
                if (dataTasks !== null) {
                    setTimeout(() => {
                        const newTasks = [];
                        dataTasks.map(([id, task]) => {
                            if (task.usuario_id == userId) {
                                newTasks.push({ id: id, nome: task.nome });
                            }
                        });
                        setTasks(newTasks);
                    }, 1000);
                }
            });
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    }

    const createTask = async (nome) => {
        try {
            if (!nome) return;
            const dataCadastro = Date();
            const dataFinal = Date();
            await push(ref(db, '/tasks'), {
                nome: nome,
                dataCadastro: dataCadastro,
                dataFinal: dataFinal,
                usuario_id: userId
            });

            alert('Tarefa cadastrada com sucesso!');

            setTask(null);
        } catch (error) {
            alert('erro: ' + error);
        }
    }

    return (
        <UserContext.Provider value={{ 
                signed
                ,user
                ,loading
                ,setLoading
                ,loginUser
                ,logOut
                ,createUser
                ,fetchTasks
                ,createTask
            }}
        >
            {children}
        </UserContext.Provider>
    );
};