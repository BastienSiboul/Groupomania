<template>
    <div>
        <Navigateur></Navigateur>

        <section class="profile">
            <h1 v-if="user">Mon profil :</h1>
            <hr>
            <h2>{{ user.prename }} {{ user.surname }}</h2>
            <div class="profile-description">
                <h4>Adresse mail</h4>
                <p class="profile--email">{{ user.email }}</p>

                <div class="delete-bottom">
                    <h4>Supprimer mon compte</h4>
                    <button class="delete" v-on:click="displayModale">Supprimer mon compte</button>
                </div>

                <div class="modaleBloc_delete" v-if="revele">
                    <div @click="displayModale" class="modaleBloc__overlay"></div>

                    <div class="modaleBloc__card">
                        <div class="modaleBloc__card__title">
                            <h2>Etes-vous sûr de vouloir supprimer votre compte ?</h2>
                            <p>(Cette action est irréversible)</p>
                            <div class="modaleBloc__card__title__close">
                                <i @click="displayModale"
                                   class="far fa-times-circle fa-2x modaleBloc__card__title__close"></i>
                            </div>
                        </div>

                        <button @click="deleteAccount" class="modaleBloc__card__button">Oui, je supprime mon compte
                        </button>
                    </div>
                </div>
            </div>
        </section>

    </div>
</template>

<script>
    import Navigateur from "@/components/Navigateur";
    import axios from 'axios';

    export default {
        name: "Profil",
        components: {Navigateur},

        data() {
            return {
                user: "",
                revele: false,
            }
        },

        created() {
            this.displayProfile();
        },

        methods: {
            // Permet d'afficher les informations de profil
            displayProfile() {
                const userId = localStorage.getItem('userId');

                axios.get('http://localhost:3000/api/auth/' + userId, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
                    .then(response => {
                        this.user = response.data
                    })
                    .catch(error => {
                        console.log(error)
                    })
            },

            displayModale() {
                this.revele = !this.revele
            },

            deleteAccount() {
                const userId = localStorage.getItem('userId');

                axios.delete('http://localhost:3000/api/auth/' + userId, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                    .then(() => {
                        localStorage.clear();
                        this.$router.push('/');
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        }
    }

</script>

<style scoped>

    h1 {
        text-align: center;
    }

    h2 {
        margin-bottom: 1rem;
        text-align: center;
    }

    h4 {
        text-align: center;
    }

    .profile-description {

    }

    .profile--email {
        text-align: center;
        margin-bottom: 2em;
    }

    .delete-bottom {
        margin-top: 2em;
        margin-bottom: 2em;
    }

    .delete {
        cursor: pointer;
        display: block;
        margin: auto;
        padding: 0.7em 1.5em;
        background: #E96666;
        border: 1px solid;
        border-radius: 5px;
    }

    .modaleBloc_delete {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modaleBloc__overlay {
        background: rgba(0, 0, 0, 0.5);
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
    }

    .modaleBloc__card {
        z-index: 2;
        position: fixed;
        background: #f1f1f1;
        color: #3f3d56;
    }

    .modaleBloc__card__title {
        display: flex;
        flex-direction: column;
        text-align: center;
        padding: 3rem 6rem 1.5rem 6rem;
    }

    .modaleBloc__card__title__close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        color: #3f3d56;
    }

    .modaleBloc__card__title__close:hover, .modaleBloc__card__title__close:focus {
        color: #ff6363;
    }

    .modaleBloc__card__button {
        margin-left: 35%;
        margin-bottom: 2em;
        border: 3px solid #3f3d56;
        border-radius: 25px;
        color: #3f3d56;
        font-size: 15px;
        font-weight: bold;
        padding: 0.9rem;
        outline-style: none;
    }

    .modaleBloc__card__button:hover, .modaleBloc__card__button:focus {
        border: 3px solid #ff6363;
        color: #ff6363;
    }

</style>

