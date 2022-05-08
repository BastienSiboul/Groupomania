<template>
    <h1>Formulaire d'inscription</h1>

    <div class="container">
        <div class="row justify-content-center">
            <div class="col-12 col-md-10 col-lg-8">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input class="form-control" id="email" type="email" v-model="email">
                </div>
                <div class="form-group">
                    <label for="password">Mot de passe</label>
                    <input class="form-control" id="password" type="password" v-model="password">
                </div>
                <div class="form-group">
                    <label for="prename">Nom</label>
                    <input class="form-control" id="prename" type="text" v-model="prename">
                </div>
                <div class="form-group">
                    <label for="surname">Prénom</label>
                    <input class="form-control" id="surname" type="text" v-model="surname">
                </div>
            </div>
        </div>
    </div>

    <div class="card-body d-flex justify-content-around">
        <bouton @click.prevent="signup" class="btn btn-dark">Inscrivez-vous</bouton>
        <router-link to="/">
            <bouton class="btn btn-dark">Retour</bouton>
        </router-link>
    </div>

</template>

<script>

    import axios from "axios";
    import {Notyf} from 'notyf';
    import 'notyf/notyf.min.css';

    export default {
        name: "Inscription",

        data() {
            return {
                prename: '',
                surname: '',
                email: '',
                password: '',
            }
        },

        created() {
            this.notyf = new Notyf({
                duration: 5000,
                position: {
                    x: 'center',
                    y: 'bottom'
                }
            });
        },

        methods: {
            // Permet de s'inscrire et de basculer sur la page de connexion
            signup() {
                axios.post('http://localhost:3000/api/auth/signup', {
                    prename: this.prename,
                    surname: this.surname,
                    email: this.email,
                    password: this.password,
                })
                    .then(() => {
                        this.$router.push('/');
                    })
                    .catch(error => {
                        console.log(error);
                        const messageerrore = error.response.data;
                        this.notyf.error(messageerrore.error);

                    })
            },
        }
    }

</script>

<style scoped>

    h1 {
        text-align: center;
        margin-top: 2%;
    }

    .container {
        margin-top: 5%;
        margin-bottom: 5%;
    }

    form {
        margin: 2em auto;
        max-width: 750px;
    }

    .btn {
        background-color: #6BB0EC;
        color: black;
    }

</style>
