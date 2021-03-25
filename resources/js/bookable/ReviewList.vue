<template>
    <div style="padding: 1.25rem">
        <h6 class="text-uppercase text-secondary font-weight-bolder pt-4">Review List</h6>

        <div class="border-bottom d-none d-md-block pt-4" v-for="number in 3" :key="number">
            <div class="row">
                <div class="col-md-6">Robert Miller</div>
                <div class="col-md-6 d-flex justify-content-end">STAR RATING</div>
            </div>
            <div class="row">
                <div class="col-md-12">Added 5 minutes ago</div>
            </div>
            <div class="row pt-4 pb-4">
                <div class="col-md-12">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </div>
            </div>
        </div>
    </div>
</template>
