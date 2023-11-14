import { View, Text } from "react-native";
import { ref, onValue, push, remove, update } from 'firebase/database';
import db from "./src/firebaseConnection";
import styles from './AppStyles';
import { useEffect, useState } from "react";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState({});

  function addNewUser() {
    push(ref(db, '/usuarios'), {
      nome: 'felipe',
      idade: 33,
    });
  }

  function updateUser(userKey) {
    const userRef = ref(db, `/usuarios/${userKey}`);
    update(userRef, {
      nome: 'felipe 124',
      // Outros campos que deseja atualizar, se houver
    });
  }

  function clearUser(userKey) {
    const userRef = ref(db, `/usuarios/${userKey}`); // Substitua 'seu_nodo' pelo caminho correto
    remove(userRef)
      .then(() => {
        console.log(`Usuário com chave ${userKey} removido com sucesso.`);
      })
      .catch((error) => {
        console.error(`Erro ao remover o usuário: ${error}`);
      });
  }

  const fetchUsers = async () => {
    try {
      onValue(ref(db, '/usuarios'), (querySnapShot) => {
        const usersData = querySnapShot.val() || {};
        setUsers(usersData); // Atualize o estado com os dados do Firebase
        console.log(usersData);
      });

    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const fetchUser = async (userKey) => {
    try {
      onValue(ref(db, `/usuarios/${userKey}`), (querySnapShot) => {
        const userData = querySnapShot.val() || {};
        console.log('Dados do usuário: ', userData);
        setLoading(false);
      });

    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(); // Chame a função fetchData para buscar os dados do Firebase
    //fetchUser('-NibYUqtja7lZV1xwbKE');
    //addNewUser();
    //clearUser('-NibYNYwqpmdCtQhV-fu');
    //updateUser('-NibYUqtja7lZV1xwbKE')
    setLoading(false);
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Carregando...</Text>
      ) : (
        // Mapeie os dados do objeto users e renderize-os
        Object.keys(users).map((userId) => (
          <View key={userId}>
            <Text>{`ID: ${userId}`}</Text>
            <Text>{`Nome: ${users[userId].nome}`}</Text>
            <Text>{`Idade: ${users[userId].idade}`}</Text>
          </View>
        ))
      )}
    </View>
  );
}
