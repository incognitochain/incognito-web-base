import { Trans } from '@lingui/macro';
import { Currency, CurrencyAmount, Percent } from '@uniswap/sdk-core';
import { MouseoverTooltip } from 'components/Core/Tooltip';
import HoverInlineText from 'components/HoverInlineText';
import useTheme from 'hooks/useTheme';
import { useMemo } from 'react';
import { ThemedText } from 'theme';
import { warningSeverity } from 'utils/prices';

export function FiatValue({
  fiatValue,
  priceImpact,
}: {
  fiatValue: CurrencyAmount<Currency> | null | undefined;
  priceImpact?: Percent;
}) {
  const theme = useTheme();
  const priceImpactColor = useMemo(() => {
    if (!priceImpact) return undefined;
    if (priceImpact.lessThan('0')) return theme.green1;
    const severity = warningSeverity(priceImpact);
    if (severity < 1) return theme.text3;
    if (severity < 3) return theme.yellow1;
    return theme.red1;
  }, [priceImpact, theme.green1, theme.red1, theme.text3, theme.yellow1]);

  const p = Number(fiatValue?.toFixed());
  const visibleDecimalPlaces = p < 1.05 ? 4 : 2;

  return (
    <ThemedText.Body fontSize={14} color={fiatValue ? theme.text3 : theme.text4}>
      {fiatValue ? (
        <Trans>
          $
          <HoverInlineText
            text={fiatValue?.toFixed(visibleDecimalPlaces, { groupSeparator: ',' })}
            textColor={fiatValue ? theme.text3 : theme.text4}
          />
        </Trans>
      ) : (
        ''
      )}
      {priceImpact ? (
        <span style={{ color: priceImpactColor }}>
          {' '}
          <MouseoverTooltip text="The estimated difference between the USD values of input and output amounts.">
            (<Trans>{priceImpact.multiply(-1).toSignificant(3)}%</Trans>)
          </MouseoverTooltip>
        </span>
      ) : null}
    </ThemedText.Body>
  );
}
