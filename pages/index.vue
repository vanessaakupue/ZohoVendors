<template>
  <div>
    <h2 class="text-center">Zoho CRM Vendor Management</h2>
    <div class="d-flex justify-content-around">
      <section v-if="vendors.length > 0" id="vendorList">
        <h3 style="text-align: center;">Existing Vendors</h3>
          <div v-for="vendor in vendors" :key="vendor.id" class="d-flex justify-content-between" id="vendorsContainer" style="max-width: 350px; width: 100%;">
            <div>
              <h4>{{ vendor.Vendor_Name }}</h4>
              <p>{{ vendor.Category }}</p>
              <p>{{ vendor.Description }}</p>
            </div>
            <button @click="deleteVendor(vendor.id)">
              delete
            </button>
          </div>
      </section>

      <section id="createVendor">
        <form method="POST" @submit.prevent>
          <label for="vendorName">Vendor Name</label>
          <input type="text" id="vendorName" v-model="vendorForm.Vendor_Name" required>

          <label for="email">Email</label>
          <input type="email" id="email" v-model="vendorForm.Email" >

          <label for="category">Category</label>
          <input type="text" id="category" v-model="vendorForm.Category" >

          <label for="description">Description</label>
          <input type="text" id="description" v-model="vendorForm.Description" >

          <label for="website">Website</label>
          <input type="text" id="website" v-model="vendorForm.Website" >

          <label for="phone">Phone</label>
          <input type="tel" id="phone" v-model="vendorForm.Phone" >

          <label for="street">Street</label>
          <input type="text" id="street" v-model="vendorForm.Street" >

          <label for="city">City</label>
          <input type="text" id="city" v-model="vendorForm.City" >

          <label for="state">State</label>
          <input type="text" id="state" v-model="vendorForm.State" >

          <label for="country">Country</label>
          <input type="text" id="country" v-model="vendorForm.Country" >

          <label for="zipCode">Zip Code</label>
          <input type="number" id="zipCode" v-model="vendorForm.Zip_Code" >

          <label for="glAccount">GL Account</label>
          <input type="text" id="glAccount" v-model="vendorForm.GL_Account" >

          <button type="submit" @click="createVendor">Create Vendor</button>
        </form>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      vendors: [],
      vendorForm: {
        Vendor_Name: '',
        Email: '',
        Category: '',
        Description: '',
        Website: '',
        Phone: '',
        Street: '',
        City: '',
        State: '',
        Country: '',
        Zip_Code: '',
        GL_Account: ''
      }
    };
  },
  computed: {
    ownerId() {
      return this.vendors.length > 0 ? this.vendors[0].Owner.id : null;
    }
  },
  methods: {
    async fetchVendors() {
      try {
        const response = await this.$axios.get('/api/Vendors',  {
          headers: { Authorization: `Zoho-oauthtoken ${this.$config.AccessToken}` }
        });
        this.vendors = response.data.data;
        console.log('vendors' ,this.vendors)
      } catch (error) {
        console.error("Failed to fetch vendors:", error.message);
      }
    },
    async createVendor() {
      try {
        const vendorData = {
          // data: [
          // {  
            Owner: { id: '6496966000000488001' },
            Vendor_Name: 'fummie',
            Email: 'fummie@gmail.com',
            Category: 'how to',
            Description: 'answers questions',
            Website: 'http://www.fumfum.com',
            Phone: '09024469938',
            Street: 'obosi street',
            City: 'enugu',
            State: 'enugu',
            Country: 'nigeria',
            Zip_Code: '400009',
            GL_Account: 'status'
        //   }
        // ]
        };

        const headers = {
          'Authorization': `Zoho-oauthtoken ${this.$config.AccessToken}`,
          // 'Content-Type': 'application/json',
          // 'Accept': 'application/json',
        };

        // console.log('Sending payload:', payload);
        // console.log('Request headers:', headers);

        const response = await this.$axios.$post('/api/Vendors', {data: [vendorData]} , {
          headers
        });
        console.log("Vendor created successfully:", response.data);
        console.log('Response received:', response.data);

        Object.keys(this.vendorForm).forEach(key => {
          this.vendorForm[key] = '';
        });
        
        await this.fetchVendors();
      } catch (error) {
        if (error.response) {
          console.error("Failed to create vendor:", error.response.data);
        } else {
          console.error("Failed to create vendor:", error.message);
        }
      }
    },
    async deleteVendor(vendorId) {
      console.log('Deleting vendor with ID:', vendorId);
      try {
        const response = await this.$axios.delete(`/api/Vendors/${vendorId}`,  {
          headers: { Authorization: `Zoho-oauthtoken ${this.$config.AccessToken}` }
        });
        console.log("Vendor deleted successfully:", response.data);
        await this.fetchVendors();
      } catch (error) {
        console.error("Failed to delete vendor:", error.message);
      }
    },
  },
  mounted() {
    this.fetchVendors();
  }
};
</script>
