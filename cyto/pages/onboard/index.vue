<template>
    <nuxt-layout name="none">
        <div class="container w-full">

            <div class="flex justify-center p-10">
                <div class="card w-96 bg-base-100 shadow-xl">
                    <figure class="px-10 pt-10">
                        <img src="/images/logo1.png" alt="Shoes" class="rounded-xl" />
                    </figure>
                    <div class="card-body items-center text-center">
                        <h2 class="card-title">getting started!</h2>
                        <p>You can import an existing wallet or create a new wallet</p>
                        <div class="card-actions flex justify-center">
                            <div>
                                <NuxtLink class="btn btn-wide btn-primary" to="/onboard/create">Create </NuxtLink>
                            </div>

                            <div>
                                <NuxtLink class="btn btn-wide  btn-secondary" to="/import">import </NuxtLink>

                            </div>

                        </div>
                    </div>
                </div>

            </div>


        </div>

    </nuxt-layout>
</template>

<script>

export default {


    

}
</script>



<style scoped></style>

