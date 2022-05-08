<template>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 col-md-10 col-lg-8">
                    <div class="card bg-light">
                        <h5 class="my-3 text-center">Bienvenue sur le réseau social interne</h5>
                        <div class="card-body d-flex justify-content-between">
                            <router-link to="/connection"><bouton class="btn btn-dark">Connectez vous</bouton></router-link>
                            <router-link to="/inscription"><bouton class="btn btn-dark">Inscrivez vous</bouton></router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
    export default {
        name: "Accueil",
    }
</script>

<style scoped>
    body {
        background-color: #D6E5F2;
    }

    .container {
        margin-top: 5%;
    }

    .btn {
        background-color: #6BB0EC;
        color: black;
    }
</style>
