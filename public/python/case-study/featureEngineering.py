# 1
# for each person & medical trial,,,, finds the "alarming" and "urgent"
# response rows n converts both to numbers n then averages them to get a single
# perceived_urgency score

# creates one column per trial
for trial in sorted(medical_trials):
    test_type = trial.split('_')[0]
    kw = test_type_keywords[test_type]

    trial_df = df[df['trialId'] == trial]

    alarming = trial_df[trial_df['responsePrompt'].str.contains('alarming', case=False, na=False)]
    urgent   = trial_df[trial_df['responsePrompt'].str.contains('urgent', case=False, na=False)]

    alarming_vals = alarming.set_index('participantId')['answer'].astype(float)
    urgent_vals   = urgent.set_index('participantId')['answer'].astype(float)

    combined = pd.DataFrame({'alarming': alarming_vals, 'urgent': urgent_vals})
    combined[f'{trial}_urgency'] = combined.mean(axis=1)

    result = result.merge(
        combined[[f'{trial}_urgency']].reset_index(),
        on='participantId', how='left'
    )

print(f"STEP 1 done: {len([c for c in result.columns if c.endswith('_urgency')])} urgency columns")
