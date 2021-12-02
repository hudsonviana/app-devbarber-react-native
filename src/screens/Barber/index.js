import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { Container } from "./styles";

import Api from "../../Api";

export  default () => {
    const navigation = useNavigation();
    const route = useRoute();

    const [userInfo, setUserInfo] = useState({
        id: route.params.id,
        avatar: route.params.avatar,
        name: route.params.name,
        stars: route.params.stars
    });

    useEffect(()=>{
        const getBarberInfo = async () => {
            let json = await Api.getBarber(userInfo.id);
            if (json.error == '') {
                console.log(json);
            } else {
                alert("Erro: " + json.error);
            }
        }
        getBarberInfo();
    }, []);
    
    return (
        <Container>
            <Text>Barbeiro: {userInfo.name}</Text>
        </Container>
    );
}