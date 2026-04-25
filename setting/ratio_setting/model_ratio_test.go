package ratio_setting

import (
	"math"
	"testing"
)

func assertFloatEqual(t *testing.T, got, want float64) {
	t.Helper()
	if math.Abs(got-want) > 1e-9 {
		t.Fatalf("got %v, want %v", got, want)
	}
}

func TestGPT54FamilyPricingDefaults(t *testing.T) {
	InitRatioSettings()

	cases := []struct {
		name           string
		wantRatio      float64
		wantCompletion float64
		wantCache      float64
	}{
		{name: "gpt-5.4", wantRatio: 1.25, wantCompletion: 6, wantCache: 0.1},
		{name: "gpt-5.4-2026-03-05", wantRatio: 1.25, wantCompletion: 6, wantCache: 0.1},
		{name: "gpt-5.4-mini", wantRatio: 0.375, wantCompletion: 6, wantCache: 0.1},
		{name: "gpt-5.4-nano", wantRatio: 0.1, wantCompletion: 6.25, wantCache: 0.1},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			gotRatio, ok, _ := GetModelRatio(tc.name)
			if !ok {
				t.Fatalf("GetModelRatio(%q) returned no value", tc.name)
			}
			assertFloatEqual(t, gotRatio, tc.wantRatio)

			gotCompletion := GetCompletionRatio(tc.name)
			assertFloatEqual(t, gotCompletion, tc.wantCompletion)

			gotCache, ok := GetCacheRatio(tc.name)
			if !ok {
				t.Fatalf("GetCacheRatio(%q) returned no value", tc.name)
			}
			assertFloatEqual(t, gotCache, tc.wantCache)
		})
	}
}

func TestPricingDefaultsForVisibleOfficialModels(t *testing.T) {
	InitRatioSettings()

	oneSixth := 1.0 / 6.0
	cases := []struct {
		name            string
		wantRatio       float64
		wantCompletion  float64
		wantCache       *float64
		wantCreateCache *float64
	}{
		{name: "GPT-5", wantRatio: 0.625, wantCompletion: 8, wantCache: floatPtr(0.1)},
		{name: "GPT-5.1", wantRatio: 0.625, wantCompletion: 8, wantCache: floatPtr(0.1)},
		{name: "GPT-5.2", wantRatio: 0.875, wantCompletion: 8, wantCache: floatPtr(0.1)},
		{name: "gpt-5.3", wantRatio: 0.875, wantCompletion: 8, wantCache: floatPtr(0.1)},
		{name: "GPT-5.3 Codex", wantRatio: 0.875, wantCompletion: 8, wantCache: floatPtr(0.1)},
		{name: "gemini-2.5-flash", wantRatio: 0.15, wantCompletion: 2.5 / 0.3, wantCache: floatPtr(0.1)},
		{name: "gemini-2.5-flash-lite", wantRatio: 0.05, wantCompletion: 4, wantCache: floatPtr(0.1)},
		{name: "gemini-2.5-pro", wantRatio: 0.625, wantCompletion: 8, wantCache: floatPtr(0.1)},
		{name: "gemini-3-flash-preview", wantRatio: 0.25, wantCompletion: 6, wantCache: floatPtr(0.1)},
		{name: "gemini-3-pro-preview", wantRatio: 1.0, wantCompletion: 6, wantCache: floatPtr(0.1)},
		{name: "gemini-3.1-flash-lite-preview", wantRatio: 0.125, wantCompletion: 6, wantCache: floatPtr(0.1)},
		{name: "gemini-3.1-pro-preview", wantRatio: 1.0, wantCompletion: 6, wantCache: floatPtr(0.1)},
		{name: "deepseek-chat", wantRatio: 0.14, wantCompletion: 1.5, wantCache: floatPtr(0.1)},
		{name: "DeepSeek-V3.2", wantRatio: 0.14, wantCompletion: 1.5, wantCache: floatPtr(0.1)},
		{name: "deepseek-r1", wantRatio: 0.14, wantCompletion: 1.5, wantCache: floatPtr(0.1)},
		{name: "MiniMax-M2.5", wantRatio: 0.15, wantCompletion: 4, wantCache: floatPtr(0.1), wantCreateCache: floatPtr(1.25)},
		{name: "MiniMax-M2.7", wantRatio: 0.15, wantCompletion: 4, wantCache: floatPtr(0.2), wantCreateCache: floatPtr(1.25)},
		{name: "kimi-k2.5", wantRatio: 0.3, wantCompletion: 5, wantCache: &oneSixth},
		{name: "mistral-large-3-675b-instruct-2512", wantRatio: 0.25, wantCompletion: 3},
		{name: "mistral-large-3:675b-cloud", wantRatio: 0.25, wantCompletion: 3},
		{name: "mistral-medium-3-instruct", wantRatio: 0.2, wantCompletion: 5},
		{name: "grok-4", wantRatio: 1.0, wantCompletion: 3},
		{name: "grok-4-heavy", wantRatio: 1.0, wantCompletion: 3},
		{name: "grok-4.1", wantRatio: 0.1, wantCompletion: 2.5},
		{name: "grok-4.1-expert", wantRatio: 0.1, wantCompletion: 2.5},
		{name: "grok-4.2", wantRatio: 1.0, wantCompletion: 3},
		{name: "voyage-3-lite", wantRatio: 0.01, wantCompletion: 0},
		{name: "voyage-4", wantRatio: 0.03, wantCompletion: 0},
		{name: "voyage-4-large", wantRatio: 0.06, wantCompletion: 0},
		{name: "voyage-4-lite", wantRatio: 0.01, wantCompletion: 0},
		{name: "voyage-code-2", wantRatio: 0.06, wantCompletion: 0},
		{name: "voyage-code-3", wantRatio: 0.09, wantCompletion: 0},
		{name: "gemini-embedding-001", wantRatio: 0.075, wantCompletion: 0},
	}

	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			gotRatio, ok, _ := GetModelRatio(tc.name)
			if !ok {
				t.Fatalf("GetModelRatio(%q) returned no value", tc.name)
			}
			assertFloatEqual(t, gotRatio, tc.wantRatio)

			gotCompletion := GetCompletionRatio(tc.name)
			assertFloatEqual(t, gotCompletion, tc.wantCompletion)

			gotCache, gotCacheOK := GetCacheRatio(tc.name)
			if tc.wantCache == nil {
				if gotCacheOK {
					t.Fatalf("GetCacheRatio(%q) unexpectedly returned %v", tc.name, gotCache)
				}
			} else {
				if !gotCacheOK {
					t.Fatalf("GetCacheRatio(%q) returned no value", tc.name)
				}
				assertFloatEqual(t, gotCache, *tc.wantCache)
			}

			gotCreateCache, gotCreateCacheOK := GetCreateCacheRatio(tc.name)
			if tc.wantCreateCache == nil {
				if gotCreateCacheOK {
					t.Fatalf("GetCreateCacheRatio(%q) unexpectedly returned %v", tc.name, gotCreateCache)
				}
			} else {
				if !gotCreateCacheOK {
					t.Fatalf("GetCreateCacheRatio(%q) returned no value", tc.name)
				}
				assertFloatEqual(t, gotCreateCache, *tc.wantCreateCache)
			}
		})
	}
}

func floatPtr(value float64) *float64 {
	return &value
}
