package model

import (
	"testing"

	"github.com/QuantumNous/new-api/common"
	"github.com/stretchr/testify/require"
)

func TestClaude46AliasesShareChannelPool(t *testing.T) {
	testCases := []struct {
		name               string
		memoryCacheEnabled bool
	}{
		{
			name:               "database path",
			memoryCacheEnabled: false,
		},
		{
			name:               "memory cache path",
			memoryCacheEnabled: true,
		},
	}

	for _, tc := range testCases {
		tc := tc
		t.Run(tc.name, func(t *testing.T) {
			truncateTables(t)

			originalMemoryCacheEnabled := common.MemoryCacheEnabled
			common.MemoryCacheEnabled = tc.memoryCacheEnabled
			t.Cleanup(func() {
				common.MemoryCacheEnabled = originalMemoryCacheEnabled
			})

			priority := int64(0)
			weight := uint(1)
			baseURLA := "https://alias-a.example"
			baseURLB := "https://alias-b.example"

			channelA := &Channel{
				Id:       101,
				Type:     1,
				Key:      "key-a",
				Status:   common.ChannelStatusEnabled,
				Name:     "alias-a",
				Weight:   &weight,
				BaseURL:  &baseURLA,
				Models:   "claude-4.6-sonnet",
				Group:    "default",
				Priority: &priority,
			}
			channelB := &Channel{
				Id:       102,
				Type:     1,
				Key:      "key-b",
				Status:   common.ChannelStatusEnabled,
				Name:     "alias-b",
				Weight:   &weight,
				BaseURL:  &baseURLB,
				Models:   "claude-sonnet-4-6",
				Group:    "default",
				Priority: &priority,
			}
			require.NoError(t, DB.Create(channelA).Error)
			require.NoError(t, DB.Create(channelB).Error)

			abilities := []Ability{
				{
					Group:     "default",
					Model:     "claude-4.6-sonnet",
					ChannelId: channelA.Id,
					Enabled:   true,
					Priority:  &priority,
					Weight:    weight,
				},
				{
					Group:     "default",
					Model:     "claude-sonnet-4-6",
					ChannelId: channelB.Id,
					Enabled:   true,
					Priority:  &priority,
					Weight:    weight,
				},
			}
			require.NoError(t, DB.Create(&abilities).Error)

			if tc.memoryCacheEnabled {
				InitChannelCache()
			}

			for _, modelName := range []string{
				"claude-4.6-sonnet",
				"claude-sonnet-4.6",
				"claude-sonnet-4-6",
			} {
				channel, err := GetRandomSatisfiedChannel("default", modelName, 0)
				require.NoError(t, err)
				require.NotNil(t, channel)
				require.Contains(t, []int{channelA.Id, channelB.Id}, channel.Id)

				require.True(t, IsChannelEnabledForGroupModel("default", modelName, channelA.Id))
				require.True(t, IsChannelEnabledForGroupModel("default", modelName, channelB.Id))
			}
		})
	}
}
