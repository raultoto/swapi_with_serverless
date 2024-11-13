import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb';
import { StarshipRepository } from '@/domain/repositories/starship.repository';
import { Starship } from '@/domain/interfaces/starship.interface';

export class DynamoDBRepository implements StarshipRepository {
  private readonly dynamodb: DynamoDB;
  private readonly tableName: string;

  constructor() {
    this.dynamodb = new DynamoDB();
    this.tableName = process.env.DYNAMODB_TABLE!;
  }

  async create(starship: Starship): Promise<Starship> {
    await this.dynamodb.putItem({
      TableName: this.tableName,
      Item: marshall(starship)
    });
    return starship;
  }

  async getAll(): Promise<Starship[]> {
    const result = await this.dynamodb.scan({
      TableName: this.tableName,
      FilterExpression: '#type = :type',
      ExpressionAttributeNames: {
        '#type': 'type'
      },
      ExpressionAttributeValues: marshall({
        ':type': 'starship'
      })
    });

    return result.Items?.map(item => unmarshall(item) as Starship) || [];
  }
}