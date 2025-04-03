import type { Tables } from "@/lib/supabase/types";
import { supabase } from "@/lib/supabase";

export const getBeers = async (): Promise<Tables<"beers">[]> => {
  const { data, error } = await supabase.from("beers").select("*");

  if (error) {
    throw error;
  }

  return data;
};

export const getBeerById = async (id: number): Promise<Tables<"beers"> | null> => {
  const { data, error } = await supabase.from("beers").select("*").eq("id", id).single();

  if (error) {
    throw error;
  }

  return data;
};

export const addToCart = async (beerId: number, userId: string, quantity: number) => {
  const { data: cartItem } = await supabase
    .from("cart_items")
    .select("quantity")
    .eq("addedBy", userId)
    .eq("beerId", beerId)
    .single();

  const newQuantity = (cartItem?.quantity ?? 0) + quantity;

  if (cartItem) {
    const { error } = await supabase
      .from("cart_items")
      .update({ quantity: newQuantity })
      .eq("addedBy", userId)
      .eq("beerId", beerId);

    if (error) {
      throw error;
    }
  } else {
    const { error } = await supabase
      .from("cart_items")
      .insert({ addedBy: userId, beerId: beerId, quantity: newQuantity });

    if (error) {
      throw error;
    }
  }
};

export const updateCartItemQuantity = async (cartItemId: number, quantity: number) => {
  const { error } = await supabase.from("cart_items").update({ quantity }).eq("id", cartItemId);

  if (error) {
    throw error;
  }
};

export const removeCartItem = async (cartItemId: number) => {
  const { error } = await supabase.from("cart_items").delete().eq("id", cartItemId);

  if (error) {
    throw error;
  }
};
