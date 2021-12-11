<template>
  <div class="container">
    <div class="card mt-4">
      <div class="card-header">
        Sellers
      </div>
      <div class="card-body">
        <input type="text" 
          v-model="name_seller" 
          placeholder="Escriba nombre del Seller"
          class="form-control"/>
        <button @click="CreateS" class="btn btn-warning btn-fill">Crear</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue';
import Seller from '../components/Seller.vue';
import Swal from 'sweetalert2';
import { createSeller } from '../services/seller';

export default {
  components: {
    Seller
  },
  setup() {
    const name_seller = ref('');

    const CreateS = async () => {
      
      //console.log(products.value);

      //Validamos que se escriba un email en la caja de texto
      if (name_seller.value === '') {
        //Si no se diligencia entonces generamos una alerta
        Swal.fire(
        'Información',
        'Por favor escriba el nombre del Seller',
        'info'
        );
        //return;
      } else {

        //Creamos el objeto que le enviamos en el body
        const seller = {
          name: name_seller.value,
        }

        //Mostramos la alerta de Cargando...

        Swal.fire({
          allowOutsideClick: false,
          text: 'Loading...'
        });
        
        Swal.showLoading();

        //Enviamos la información al Servicio
        console.log(seller);
        const resp = await createSeller(seller);

        //Si el reultado es false, mostramos en pantalla que ocurrio un error
        if (!resp.ok) {
          console.log('Error al guardar');
        } else {
          //De lo contrario limpiamos los productos
          console.log('OK')
          name_seller.value = '';
        }
        
        //Cerramos la ventana del Loading..
        Swal.close();

      }

    }

    return {

      CreateS,
      name_seller,
    }

  }
}
</script>

<style scoped>
  .card-header {
    background: #de1822;
    color: white;
    font-size: 16px;
  }
</style>