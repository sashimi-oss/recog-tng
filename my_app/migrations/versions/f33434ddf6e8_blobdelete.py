"""blobDelete

Revision ID: f33434ddf6e8
Revises: 
Create Date: 2024-10-28 19:18:54.084819

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'f33434ddf6e8'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('recogs', schema=None) as batch_op:
        batch_op.drop_column('blob')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('recogs', schema=None) as batch_op:
        batch_op.add_column(sa.Column('blob', mysql.MEDIUMBLOB(), nullable=True))

    # ### end Alembic commands ###
