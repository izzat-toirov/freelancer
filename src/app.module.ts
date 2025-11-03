import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProfileModule } from './profile/profile.module';
import { GigModule } from './gig/gig.module';
import { CategoryModule } from './category/category.module';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';
import { WalletModule } from './wallet/wallet.module';
import { TransactionModule } from './transaction/transaction.module';
import { ConversationModule } from './conversation/conversation.module';
import { MessageModule } from './message/message.module';
import { ReviewModule } from './review/review.module';
import { NotificationModule } from './notification/notification.module';
import { DisputeModule } from './dispute/dispute.module';
import { AdminLogModule } from './admin-log/admin-log.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
    }),
    UsersModule,
    PrismaModule,
    ProfileModule,
    GigModule,
    CategoryModule,
    OrderModule,
    PaymentModule,
    WalletModule,
    TransactionModule,
    ConversationModule,
    MessageModule,
    ReviewModule,
    NotificationModule,
    DisputeModule,
    AdminLogModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
