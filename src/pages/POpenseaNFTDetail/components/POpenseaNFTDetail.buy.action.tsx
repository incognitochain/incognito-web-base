import { Convert, POpenseaBuyFee, POpenseaNft } from 'models/model/POpenseaNFT';
import PToken from 'models/model/pTokenModel';
import { postEstimateFee } from 'services/rpcPOpensea';

interface IComponent {
  setBuyFee: (fee: POpenseaBuyFee | undefined) => void;
  setLoadingFee: (data: boolean) => void;
}
export interface IPOpenseaNFTDetailBuyAction {
  estimateFee: (selectedToken: PToken, reciptientAddress?: string, selectedNFT?: POpenseaNft) => void;
}

export class POpenseaNFTDetailBuyAction implements IPOpenseaNFTDetailBuyAction {
  protected component: IComponent;
  protected dispatch: any;

  constructor(props: { component: IComponent; dispatch: any }) {
    this.component = props.component;
    this.dispatch = props.dispatch;
  }

  estimateFee = async (
    selectedToken: PToken,
    reciptientAddress?: string | undefined,
    selectedNFT?: POpenseaNft | undefined
  ) => {
    if (!selectedNFT) {
      return;
    }
    const seaportSellOrder = selectedNFT.getSeaportSellOrder();
    const assetContract = selectedNFT.assetContract;
    const tokenId = selectedNFT.tokenId;

    if (reciptientAddress && seaportSellOrder && assetContract && assetContract.address && tokenId) {
      this.component.setLoadingFee(true);
      const contract = assetContract.address;
      try {
        const res = await postEstimateFee(
          contract,
          tokenId,
          selectedToken.tokenID,
          seaportSellOrder.getCurrentPrice(),
          reciptientAddress
        );
        if (res && res.Calldata) {
          const fee = Convert.toPOpenseaBuyFee(res);
          this.component.setBuyFee(fee);
        }
      } catch (error) {
        console.log('ESTIMATE FEE ERROR: ', ErrorEvent);
      } finally {
        this.component.setLoadingFee(false);
      }
    }
  };
}
