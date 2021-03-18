import { IgApiClient } from 'instagram-private-api';



const ig=new IgApiClient();
const IG_USERNAME='ehsin.orig';

(async ()=>{
    39157059996
    console.log('usereid ',await ig.user.getIdByUsername(IG_USERNAME))

})()

