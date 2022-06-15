<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <v-data-table
    :headers="headers"
    :items="customers"
    :search="search"
    sort-by="calories"
    class="elevation-1"
  >
    <template #top>
      <v-toolbar flat>
        <v-toolbar-title>Customers</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-text-field
          v-model="search"
          class="justify-center"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-dialog v-model="dialog" max-width="500px">
          <template #activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2 p-2"
              v-bind="attrs"
              v-on="on"
            >
              Add New
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.customer_id"
                      label="Customer ID"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="8">
                    <v-text-field
                      v-model="editedItem.customer_name"
                      label="Customer Name"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <!-- eslint-disable-next-line vue/valid-v-slot -->
    <template #item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template #no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>

<script>
const axios = require('axios')

export default {
  data: () => ({
    search: '',
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: 'Customer Id',
        align: 'start',
        value: 'customer_id',
      },
      { text: 'Customer Name', value: 'customer_name' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    customers: [],
    editedIndex: -1,
    editedItem: {
      customer_id: '',
      customer_name: '',
    },
    defaultItem: {
      customer_id: '',
      customer_name: '',
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    this.initialize()
  },

  methods: {
    async initialize() {
      // eslint-disable-next-line no-unused-vars
      await axios
        .get('http://localhost:1337/api/customers/')
        .then((response) => {
          response.data.data.forEach((item) => {
            this.customers.push({
              customer_id: item.attributes.customer_id,
              customer_name: item.attributes.customer_name,
            })
          })
        })
        .catch((error) => {
          console.error(error)
        })
    },

    editItem(item) {
      this.editedIndex = this.customers.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.customers.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.customers.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    async save() {
      try {
        await this.$strapi.create('customers', {
          data: this.editedItem,
        })
      } catch (error) {
        console.log(error)
      }
      // this.customers.push(this.editedItem)
      // await axios
      //   .post('http://localhost:1337/api/customers/', {
      //     data: {
      //       customer_id: this.editItem.customer_id,
      //       customer_name: this.editItem.customer_name,
      //     },
      //   })
      //   .then(function (response) {
      //     console.log(response)
      //   })
      //   .catch(function (error) {
      //     console.error(error)
      //   })
      this.close()
    },
  },
}
</script>
