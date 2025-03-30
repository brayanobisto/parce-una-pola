// TODO: Add react query for caching beers
import { supabase } from "@/lib/supabase";
import { Tables } from "@/lib/supabase/types";
import { useEffect, useState, useCallback } from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BeerCard, CARD_HEIGHT } from "@/components/BeerCard";
import { getBeers } from "@/lib/supabase/services";

export default function Home() {
  const [beers, setBeers] = useState<Tables<"beers">[]>([]);

  useEffect(() => {
    getBeers().then(setBeers);
  }, []);

  const renderItem = useCallback(({ item }: { item: Tables<"beers"> }) => <BeerCard beer={item} />, []);
  const keyExtractor = useCallback((item: Tables<"beers">) => item.id.toString(), []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={beers}
        keyExtractor={keyExtractor}
        getItemLayout={(data, index) => ({
          length: CARD_HEIGHT,
          offset: CARD_HEIGHT * index,
          index,
        })}
        renderItem={renderItem}
        contentContainerClassName="gap-4 p-4"
      />
    </SafeAreaView>
  );
}
