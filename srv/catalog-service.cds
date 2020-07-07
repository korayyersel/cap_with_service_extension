using {NorthWind as external} from '../db/extended.cds';

service CatalogService {

    entity Products as projection on external.Products {
        key ID, Name, Description, ReleaseDate, DiscontinuedDate, Rating, Price, AlternateName
    };

}