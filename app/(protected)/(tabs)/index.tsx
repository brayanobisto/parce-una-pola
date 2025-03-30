// TODO: Add react query for caching beers
import { useCallback, useEffect, useState } from "react";
import { FlatList } from "react-native";

import type { Tables } from "@/lib/supabase/types";
import { BeerCard, CARD_HEIGHT } from "@/components/BeerCard";
import { SafeAreaView } from "@/components/ui/SafeAreaView";
import { getBeers } from "@/lib/supabase/services";

export default function Home() {
  const [beers, setBeers] = useState<Tables<"beers">[]>([]);

  useEffect(() => {
    getBeers().then(setBeers);
  }, []);

  const renderItem = useCallback(({ item }: { item: Tables<"beers"> }) => <BeerCard beer={item} />, []);
  const keyExtractor = useCallback((item: Tables<"beers">) => item.id.toString(), []);

  return (
    <SafeAreaView className="p-0">
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
