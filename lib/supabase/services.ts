import type { Tables } from "@/lib/supabase/types";
import { supabase } from "@/lib/supabase";

export const getBeers = async (): Promise<Tables<"beers">[]> => {
  const { data, error } = await supabase.from("beers").select("*");

  if (error) {
    console.error("getBeers error", error);
    throw error;
  }

  return data;
};

export const getBeerById = async (id: number): Promise<Tables<"beers"> | null> => {
  const { data, error } = await supabase.from("beers").select("*").eq("id", id).single();

  if (error) {
    console.error("getBeerById error", error);
    throw error;
  }

  return data;
};

export const getCartItems = async (): Promise<Tables<"cart_items">[]> => {
  const { data, error } = await supabase.from("cart_items").select("*");

  if (error) {
    console.error("getCartItems error", error);
    throw error;
  }

  return data;
};

export const getCartItemsView = async (): Promise<Tables<"cart_items_view">[]> => {
  const { data, error } = await supabase
    .from("cart_items_view")
    .select("*")
    .order("cartItemCreatedAt", { ascending: true });

  if (error) {
    console.error("getCartItemsView error", error);
    throw error;
  }

  return data;
};

export const addCartItem = async (beerId: number, userId: string, quantity: number) => {
  const { data: cartItem, error: getCartItemError } = await supabase
    .from("cart_items")
    .select("quantity")
    .eq("addedBy", userId)
    .eq("beerId", beerId)
    .single();

  if (getCartItemError) {
    console.error("addCartItem error", getCartItemError);
    throw getCartItemError;
  }

  const newQuantity = (cartItem?.quantity ?? 0) + quantity;

  if (cartItem) {
    const { error: updateCartItemError } = await supabase
      .from("cart_items")
      .update({ quantity: newQuantity })
      .eq("addedBy", userId)
      .eq("beerId", beerId);

    if (updateCartItemError) {
      console.error("updateCartItem error", updateCartItemError);
      throw updateCartItemError;
    }
  } else {
    const { error: insertCartItemError } = await supabase
      .from("cart_items")
      .insert({ addedBy: userId, beerId: beerId, quantity: newQuantity });

    if (insertCartItemError) {
      console.error("insertCartItem error", insertCartItemError);
      throw insertCartItemError;
    }
  }
};

export const updateCartItemQuantity = async (cartItemId: number, quantity: number) => {
  const { error } = await supabase.from("cart_items").update({ quantity }).eq("id", cartItemId);

  if (error) {
    console.error("updateCartItemQuantity error", error);
    throw error;
  }
};

export const removeCartItem = async (cartItemId: number) => {
  const { error } = await supabase.from("cart_items").delete().eq("id", cartItemId);

  if (error) {
    console.error("removeCartItem error", error);
    throw error;
  }
};
