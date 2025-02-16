
import { supabase } from "../lib/supabase";

export const getOptions = async () => {
  try {
    const { data, error } = await supabase.from("nc_options").select("*");
    console.log(data);
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Error fetching options:", error);
    return [];
  }
};
