<template>
  <div class="container">
    <div class="card mt-4">
      <div class="card-header">
        Products car
      </div>
      <div class="card-body">
        <input type="email" 
          v-model="email" 
          placeholder="Escriba su email"
          class="form-control"/>
        <template v-if="products.length === 0">
          <p>No existen productos</p>
        </template>
        <template v-if="products.length > 0">
          <table class="table table-hover table-borderless">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Inventory</th>
                <th scope="col">Quantity</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <template v-for="product in products" :key="product.id">
                  <ProductCar :product="product" :reloadCarFun="reloadCarFun" />
              </template>
            </tbody>
          </table>
          <button @click="buyNow" class="btn btn-warning btn-fill">Buy now</button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { get, removeAll } from '../services/car';
import { ref, watchEffect } from 'vue';
import ProductCar from '../components/ProductCar.vue';
import Swal from 'sweetalert2';
import { createOrder } from '../services/order';

export default {
  components: {
    ProductCar
  },
  setup() {
    const products = ref([]);
    const reloadCar = ref(false);
    const email = ref('');

    watchEffect(() => {
      
      reloadCar.value;

      products.value = get();

    });

    const reloadCarFun = () => {
      reloadCar.value = !reloadCar.value;
    }

    const buyNow = async () => {
      
      //console.log(products.value);

      //Validamos que se escriba un email en la caja de texto
      if (email.value === '') {
        //Si no se diligencia entonces generamos una alerta
        Swal.fire(
        'Información',
        'Por favor escriba un email',
        'info'
        );
        //return;
      } else {
        //Validamos que se ingresen cantidades
        for (const product of products.value) {
          
          if (!product.quantity || product.quantity <= 0) {
            
            Swal.fire(
            'Información',
            `Por favor seleccione la cantidad para ${product.name}`,
            'info'
            );
            return;
          }
            
        }

        //Creamos el objeto que le enviamos en el body
        const order = {
          email: email.value,
          products: products.value,
        }

        //Mostramos la alerta de Cargando...

        Swal.fire({
          allowOutsideClick: false,
          text: 'Loading...'
        });
        
        Swal.showLoading();

        //Enviamos la información al Servicio
        const resp = await createOrder(order);

        //Si el reultado es false, mostramos en pantalla que ocurrio un error
        if (!resp.ok) {
          console.log('Error al guardar');
        } else {
          //De lo contrario limpiamos los productos
          console.log('OK')
          removeAll(); //Limpiamos el localStorage, porque ya se genero el Pedido
          products.value = [];
          email.value = '';
        }
        
        //Cerramos la ventana del Loading..
        Swal.close();

      }

    }

    return {
      products,
      reloadCarFun,
      buyNow,
      email,
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