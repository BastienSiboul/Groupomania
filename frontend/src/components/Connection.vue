<template>
    <h1>Page de connection</h1>
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
            </div>
        </div>
    </div>

    <div class="card-body d-flex justify-content-around">
        <bouton @click.prevent="login" class="btn btn-dark">Se connecter</bouton>
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
        name: "Connection",

        data() {
            return {
                email: '',
                password: '',
            }
        },

        created() {
            this.notyf = new Notyf({
                duration: 4000,
                position: {
                    x: 'center',
                    y: 'bottom'
                }
            });
        },

        methods: {
            // Permet de se connecter et de recharger la page sans que l'utilisateur soit déconnecté
            login() {
                axios.post('http://localhost:3000/api/auth/login', {
                    email: this.email,
                    password: this.password,
                })
                    .then(response => {
                        localStorage.setItem('token', response.data.token);
                        localStorage.setItem('userId', response.data.userId);
                        localStorage.setItem('prename', response.data.prename);
                        localStorage.setItem('surname', response.data.surname);
                        localStorage.setItem('isAdmin', response.data.isAdmin);
                        localStorage.setItem('imageProfile', response.data.imageProfile);

                        this.$router.push('Actualite');
                    })
                    .catch(error => {
                        console.log(error);
                        const messageerrore = error.response.data;
                        this.notyf.error(messageerrore.error);
                    })
            }
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
