import { useCallback } from "react";
import { FlatList } from "react-native";

import type { Tables } from "@/lib/supabase/types";
import { BeerCard, CARD_HEIGHT } from "@/components/BeerCard";
import { LoadingView } from "@/components/ui/LoadingView";
import { SafeAreaView } from "@/components/ui/SafeAreaView";
import { useBeers } from "@/hooks/beer/useBeers";

export default function Home() {
  const { data: beers = [], isPending: isBeersPending } = useBeers();

  const renderItem = useCallback(({ item }: { item: Tables<"beers"> }) => <BeerCard beer={item} />, []);
  const keyExtractor = useCallback((item: Tables<"beers">) => item.id.toString(), []);

  if (isBeersPending) return <LoadingView />;

  return (
    <SafeAreaView>
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
