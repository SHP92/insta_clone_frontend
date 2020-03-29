import { gql } from 'apollo-boost';

export const LOGIN = gql`
    mutation requestSecret($email: String!){
        requestSecret(email: $email)
    }
`;

export const CONFIRM_SECRET = gql`
    mutation confirmSecret($email: String!, $secret: String!){
        confirmSecret(email: $email, secret: $secret)
    }
`;

export const CREATE_ACCOUNT = gql`
    mutation createAccount($name:String!, $email:String!){
        createAccount(name:$name, email:$email){
            id
            name
            email
        }
    }
`;