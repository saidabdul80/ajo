<template>
    <DefaultLayout>

        <div class="tw-h-full tw-w-full" color="light">
            <DataTable :paginationData="transactions" :headers="headers" />
        </div>
    </DefaultLayout>
</template>

<script>
import DefaultLayout from "@/components/DefaultLayout.vue";
import DataTable from "@/components/Table/Table.vue"
    export default {
        components: {
            DataTable,
            DefaultLayout
        },
        data() {
            return {
                transactions: {
                    data: [
                        { account: "Account 1", date: "2024-10-01", transactionId: "TXN1", transactionType: "Credit", amount: "$100.00", status: "Completed" },
                        { account: "Account 2", date: "2024-10-01", transactionId: "TXN2", transactionType: "Debit", amount: "$200.00", status: "Pending" },
                        { account: "Account 3", date: "2024-10-01", transactionId: "TXN3", transactionType: "Credit", amount: "$300.00", status: "Completed" },
                        { account: "Account 4", date: "2024-10-01", transactionId: "TXN4", transactionType: "Debit", amount: "$400.00", status: "Pending" },
                        { account: "Account 5", date: "2024-10-01", transactionId: "TXN5", transactionType: "Credit", amount: "$500.00", status: "Completed" },
                        { account: "Account 6", date: "2024-10-01", transactionId: "TXN6", transactionType: "Debit", amount: "$600.00", status: "Pending" },
                        { account: "Account 7", date: "2024-10-01", transactionId: "TXN7", transactionType: "Credit", amount: "$700.00", status: "Completed" },
                        { account: "Account 8", date: "2024-10-01", transactionId: "TXN8", transactionType: "Debit", amount: "$800.00", status: "Pending" },
                        { account: "Account 9", date: "2024-10-01", transactionId: "TXN9", transactionType: "Credit", amount: "$900.00", status: "Completed" },
                        { account: "Account 10", date: "2024-10-01", transactionId: "TXN10", transactionType: "Debit", amount: "$1000.00", status: "Pending" },
                    ],
                    meta: {
                        current_page: 1,
                        from: 1,
                        last_page: 5,
                        path: "/transactions",
                        links:{
                            prev:null,
                            next: "/transactions?page=2"
                        },
                        per_page: 10,
                        to: 10,
                        total: 50
                    }
                },
                headers: [   
                {key:"account", title:"Account name"},
                {key:"date", title:"Date"},
                {key:"transactionId", title:"Transaction ID"},
                {key:"transactionType", title:"Transaction type"},
                {key:"amount", title:"Amount"},
                {key:"status", title:"Status"},
            ]
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>