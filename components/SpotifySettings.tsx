'use client'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Settings, RefreshCw } from 'lucide-react'
import { SpotifyTimeRange, SpotifyFetchParams } from '@/types/spotify'

interface SpotifySettingsProps {
  params: SpotifyFetchParams
  onParamsChange: (params: SpotifyFetchParams) => void
  onRefresh: () => void
  isLoading: boolean
}

export default function SpotifySettings({
  params,
  onParamsChange,
  onRefresh,
  isLoading,
}: SpotifySettingsProps) {
  const timeRangeOptions = [
    { value: 'short_term' as SpotifyTimeRange, label: '4 dernières semaines' },
    { value: 'medium_term' as SpotifyTimeRange, label: '6 derniers mois' },
    { value: 'long_term' as SpotifyTimeRange, label: 'Plusieurs années' },
  ]

  const limitOptions = [5, 10, 20, 50]

  return (
    <Card className="border-border bg-card/50 p-6">
      <div className="mb-4 flex items-center">
        <Settings className="text-primary mr-2 h-5 w-5" />
        <h3 className="text-foreground text-lg font-semibold">Paramètres</h3>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label className="text-foreground text-sm font-medium">
            Période d&apos;analyse
          </Label>
          <div className="space-y-2">
            {timeRangeOptions.map((option) => (
              <label
                key={option.value}
                className="flex cursor-pointer items-center space-x-2"
              >
                <input
                  type="radio"
                  name="timeRange"
                  value={option.value}
                  checked={params.timeRange === option.value}
                  onChange={(e) =>
                    onParamsChange({
                      ...params,
                      timeRange: e.target.value as SpotifyTimeRange,
                    })
                  }
                  className="text-primary focus:ring-primary h-4 w-4"
                />
                <span className="text-foreground text-sm">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Nombre d'éléments */}
        <div className="space-y-2">
          <Label className="text-foreground text-sm font-medium">
            Nombre d&apos;éléments
          </Label>
          <select
            value={params.limit}
            onChange={(e) =>
              onParamsChange({
                ...params,
                limit: Number(e.target.value),
              })
            }
            className="border-input bg-background text-foreground focus:border-primary focus:ring-primary/20 w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
          >
            {limitOptions.map((limit) => (
              <option key={limit} value={limit}>
                {limit} éléments
              </option>
            ))}
          </select>
        </div>

        {/* Bouton de rafraîchissement */}
        <div className="flex items-end">
          <Button
            onClick={onRefresh}
            disabled={isLoading}
            className="bg-primary text-primary-foreground hover:bg-primary/90 w-full"
          >
            <RefreshCw
              className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`}
            />
            {isLoading ? 'Chargement...' : 'Actualiser'}
          </Button>
        </div>
      </div>
    </Card>
  )
}
