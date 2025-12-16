import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AttractionsModule } from './attractions/attractions.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { EventsModule } from './events/events.module';
import { FoodsModule } from './foods/foods.module';
import { HotelsModule } from './hotels/hotels.module';
import { AnnouncementsModule } from './announcements/announcements.module';
import { AttractionCategoriesModule } from './attraction-categories/attraction-categories.module';
import { RestaurantCategoriesModule } from './restaurant-categories/restaurant-categories.module';
import { MainCategoriesModule } from './main-categories/main-categories.module';
import { PoisModule } from './pois/pois.module';
import { ReviewsModule } from './reviews/reviews.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { FirebaseModule } from './firebase/firebase.module';
import { TransportRoutesModule } from './transport-routes/transport-routes.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    DatabaseModule,
    AttractionsModule,
    RestaurantsModule,
    EventsModule,
    FoodsModule,
    HotelsModule,
    AnnouncementsModule,
    AttractionCategoriesModule,
    RestaurantCategoriesModule,
    MainCategoriesModule,
    PoisModule,
    ReviewsModule,
    UserModule,
    AuthModule,
    FirebaseModule,
    TransportRoutesModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
