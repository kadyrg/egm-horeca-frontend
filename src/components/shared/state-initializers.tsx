import { CartItemsInitializer } from "./cart-items-initializer";
import { UserProductLikesInitializer } from "./user-product-likes-initializer";

async function StateInitializers() {
  return (
    <>
      <CartItemsInitializer />
      <UserProductLikesInitializer />
    </>
  );
}

export { StateInitializers };
