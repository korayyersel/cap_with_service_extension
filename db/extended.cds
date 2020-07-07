using {NorthWind as external} from '../srv/external/NorthWind.csn';
namespace qperior.serviceextension;

extend external.Products with {
  AlternateName: String(10);
}

entity ProductExtension {
    ID:Integer;
    AlternateName:String(10);
}
