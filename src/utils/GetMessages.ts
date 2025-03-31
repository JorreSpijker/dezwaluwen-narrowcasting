
import { supabase } from "../lib/supabase";

export const getMessages = async () => {
  try {
    const { data, error } = await supabase.from("nc_messages").select("*");
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Error fetching options:", error);
    return [];
  }
};
