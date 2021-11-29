import AsyncStorage from "@react-native-async-storage/async-storage";

//const BASE_API = 'https://api.b7web.com.br/devbarber/api';
const BASE_API = 'http://192.168.1.105:80/estetica/public/api';

export default {
    checkToken: async (token) => {
        const req = await fetch(`${BASE_API}/auth/refresh`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token})
        });
        const json = await req.json();
        return json;
    },
    signIn: async (email, password) => {
        const req = await fetch(`${BASE_API}/auth/login`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        });
        const json = await req.json();
        return json;
    },
    signUp: async (name, email, password) => {
        //const req = await fetch(`${BASE_API}/user`, {
        const req = await fetch(`${BASE_API}/auth/register`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, password})
        });
        const json = await req.json();
        return json;
    },
    getBarbers: async (lat=null, lng=null, address=null) => {
        const token = await AsyncStorage.getItem('token');

        //  console.log("TOKEN:", token);
        //  console.log("LAT:", lat);
        //  console.log("LNG:", lng);
        //  console.log("ADDRESS:", address);

        // const req = await fetch(`${BASE_API}/barbers?token=${token}&lat=${lat}&lng=${lng}&address=${address}`);
        const req = await fetch(`${BASE_API}/estets?token=${token}&lat=${lat}&lng=${lng}&address=${address}`);
        const json = await req.json();
        return json;
    }
};